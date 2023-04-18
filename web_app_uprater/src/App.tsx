import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NavBar } from "./modules/NavBar/NavBar"
import { useAuth } from "./store/auth"

function App() {
  const [rates, setRates] = useState<any[]>([])
  const token = useAuth(state => state.token)
  const navigate = useNavigate()
  const rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const today = new Date()
  const getRates = async () => {
    const res = await fetch('http://localhost:3000/rate', {
      credentials: 'include'
    })
    const status = await res.status
    console.log(res)
    if (status === 401 || status === 302 || status === 403) navigate('/login')
    const rates = await res.json()
    setRates(rates.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  }

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      topics: { value: string }
      comment: { value: string }
      value: { value: string }
      anon: { checked: boolean }
    }
    const topics = [target.topics.value]
    const comment = target.comment.value
    const value = target.value.value
    const anon = target.anon.checked
    const csrf = await fetch('http://localhost:3000/secoptions', {
      credentials: 'include'
      })
    const tokencsrf = await csrf.json()

    const res = await fetch('http://localhost:3000/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': tokencsrf.csrfToken
      },
      credentials: 'include',
      body: JSON.stringify({
        topics,
        comment,
        value,
        anon,
        created_at: new Date()
      })
    })
    const status = await res.status
    if (status === 401 || status === 302 || status === 403) navigate('/login')
    const rate = await res.json()
    setRates([...rates, rate].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  }


  useEffect(() => {
    getRates()
  }, [])
  return (
    <div>
      <NavBar />
      <div className="grid gap-10 place-content-center m-10">
        <div>
          <h2>Create Rate</h2>
          <div>
          <form onSubmit={handleCreation} className="grid gap-3 bg-slate-700 p-10 rounded-md">
            <input className="bg-transparent border-red-50 border p-2 rounded-md" type="text" name="topics" placeholder="Topics" />
            <input className="bg-transparent border-red-50 border p-2 rounded-md" type="text" name="comment" placeholder="Comment" />
            <input className="bg-transparent border-red-50 border p-2 rounded-md" type="number" name="value" placeholder="Value" />
            <div className="flex gap-4">
            <label htmlFor="anon">Anon</label>
            <input className="bg-transparent border-red-50 border p-2 rounded-md" type="checkbox" name="anon" id="anon"/>
            </div>
            <button type="submit">Create</button>
          </form>
          </div>
        </div>
        {rates.map(rate => {
          const timeDiff = today.getTime() - new Date(rate.created_at).getTime()
          return (
          <div key={rate.id} className="bg-slate-500 p-10 w-max rounded-md">
            <h1>{rate.name}</h1>
            <p>{rate.comment}</p>
            <p>{rate.value}</p>
            <p>Anon: {rate.anon.toString()}</p>
            <small>{rtf2.format(-Math.floor(timeDiff / (1000 * 60 * 60 * 24)), 'days')}</small>
          </div>
        )}
          )
          }
      </div>
    </div>
  )
}

export default App
