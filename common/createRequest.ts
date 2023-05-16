const createRequest = (req: any) => {
  const cloneReq: { [key: string]: any } = {};
  for (let key in req) {
    if (req[key]) {
      cloneReq[key] = req[key];
    }
  }
  return cloneReq;
};

export default createRequest;
