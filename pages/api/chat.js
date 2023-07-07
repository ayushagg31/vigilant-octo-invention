export default function handler(req, res) {
  console.log(process.env.AAA)
  res.status(200).json({ name: 'John Doe' })
}