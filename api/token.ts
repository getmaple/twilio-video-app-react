import { NowRequest, NowResponse } from '@vercel/node';
import Twilio from 'twilio';
const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;
module.exports = (req: NowRequest, res: NowResponse) => {
  const { identity, roomName } = req.query;
  const token = new Twilio.jwt.AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION,
    identity: identity as string,
  });
  const videoGrant = new Twilio.jwt.AccessToken.VideoGrant({ room: roomName as string });
  token.addGrant(videoGrant);
  res.status(200).send(token.toJwt());
  console.log(`issued token for ${identity} in room ${roomName}`);
};
