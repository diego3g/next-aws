import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400, stale-while-revalidate, public');

  const response = await fetch('https://api.github.com/orgs/rocketseat/repos');
  const data = await response.json();

  return res.json({
    time: new Date(),
    data,
  })
}
