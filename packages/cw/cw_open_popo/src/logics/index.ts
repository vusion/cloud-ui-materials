import { pp } from "@popo-bridge/web";

export interface PopoMessageOptions {
  id: string;
  type: 1 | 2 | 3 | 4 | 5 | 6;
  defaultMessage?: string;
}

export const openPopoChat = async (options: PopoMessageOptions) => {
  try {
    await pp.openMessageSession(options);
  } catch (err) {
    console.error('Failed to open POPO chat:', err);
    throw err;
  }
};

export default {
  openPopoChat
};