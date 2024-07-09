const getIdByJwt = async (jwt: string) => {
  const payload = jwt.split(".")[1];
  const buff = Buffer.from(payload, "base64");
  const payloadObj = JSON.parse(buff.toString("utf-8"));
  return payloadObj.id;
};
