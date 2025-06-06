export type TicketBubbleModel =
  | {
      type: "message";
      senderName: string;
      content: string;
      isInternal: boolean;
      sendDate: string;
      roles: string[];
    }
  | {
      type: "file";
      senderName: string;
      filename: string;
      fileId: number;
      filetype: string;
      uploadDate: string;
    };
