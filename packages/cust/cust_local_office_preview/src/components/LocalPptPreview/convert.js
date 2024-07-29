import axios from 'axios';
import cookies from 'js-cookie';

export async function convertToPdfAndGetResult(url, type = 1, onUpdate) {
  const authorization = cookies.get('authorization');
  const headers = authorization ? { Authorization: authorization } : {};
  try {
    const { data: keyData } = await axios.post('/expand/transfer/to_pdf', {
      fileUrl: url,
      type
    }, { headers });

    const { Data: key } = keyData;
    if (!key) {
      throw new Error('No key received from /expand/transfer/to_pdf');
    }

    const getResult = async () => {
      const { data: resultData } = await axios.get('/expand/transfer/get_result', {
        params: { key }
      }, { headers });
      return resultData;
    };

    const startTime = Date.now();
    const TIMEOUT = 5 * 60 * 1000; // 2分钟

    while (true) {
      const { Data: resultData, Code, Message } = await getResult();

      if (Code !== 200) {
        throw new Error(`Failed to get result: ${Message}`);
      }

      switch (resultData.status) {
        case 0:
          console.log('Conversion successful!', resultData.pageUrls);
          onUpdate(resultData.pageUrls);
          return resultData.pageUrls;
        case 1:
          if (resultData.pageUrls && resultData.pageUrls.length > 0) {
            console.log('Conversion in progress but partial data available.', resultData.pageUrls);
            onUpdate(resultData.pageUrls);
          } else {
            console.log('Waiting for conversion to complete...');
          }
          break;
        case 2:
          throw new Error('Invalid key received from /expand/transfer/get_result');
        default:
          throw new Error(`Unexpected status received: ${resultData.status}`);
      }

      if (Date.now() - startTime > TIMEOUT) {
        console.log('Returning partial data due to timeout:', resultData.pageUrls);
        onUpdate(resultData.pageUrls);
        return resultData.pageUrls;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
