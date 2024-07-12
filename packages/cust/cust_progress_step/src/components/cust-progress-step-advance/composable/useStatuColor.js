export default function useStatuColor(status, colors) {
  const statusColorMap = {};

  function mapStatusToColor() {
    status.forEach((v, i) => {
      statusColorMap[v] = colors[i];
    });
    return statusColorMap;
  }

  return mapStatusToColor();
}
