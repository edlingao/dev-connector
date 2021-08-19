
export default (
  res,
  {
    status,
    payload = {
      msg: '',
      info: {}
    }
  }) => res.status(status).json(payload)