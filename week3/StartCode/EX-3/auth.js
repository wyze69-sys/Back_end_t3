export default function auth(req, res, next) {
  if (req.query.token !== 'xyz123') {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  next();
}