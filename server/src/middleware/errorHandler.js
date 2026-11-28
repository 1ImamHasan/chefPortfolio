export function notFound(req, res, _next) {
  res.status(404).json({ message: `Not Found: ${req.originalUrl}` })
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || (err.name === 'ZodError' ? 400 : 500)
  const message = err.message || 'Internal Server Error'

  if (err.name === 'ZodError') {
    return res.status(400).json({ message: 'Validation failed', errors: err.errors })
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate record already exists.' })
  }

  res.status(status).json({ message })
}
