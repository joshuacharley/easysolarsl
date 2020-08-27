import { Response } from "express";

// export const send_refresh_token = (res: Response, token: string) => {
//   res.cookie("tid", token, { httpOnly: true });
// };

export const send_refresh_token = (res: Response, token: string) => {
  res.cookie("tid", token, { httpOnly: true });
};
