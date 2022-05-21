// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import 

export default function handler(req, res) {
  const {method } = req;



  res.status(200).json({ name: 'John Doe' })
}
