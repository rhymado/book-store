const response = {};

response.successResponse = (res, status, data, meta) => {
  res.status(status).json({
    list: data,
    meta,
    err: null,
  });
};

response.errorResponse = (res, status, err) => {
  res.status(status).json({
    err,
    data: [],
  });
};

module.exports = response;
