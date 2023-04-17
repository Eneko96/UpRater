import { useAuth } from "../store/auth"

export const CreateRate = () => {
  const token = useAuth(state => state.token)

  const handleCreateRate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      value: { value: number }
      comment: { value: string }
      topics: { value: string }
      anon: { checked: boolean }
    }

    const value = target.value.value
    const comment = target.comment.value
    const topics = target.topics.value
    const anon = target.anon.checked

    const res = await fetch('http://localhost:3000/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        value,
        comment,
        topics: [topics],
        created_at: new Date(),
        anon,
      })
    })

    const rate = await res.json()

    console.log(rate)
    
  }
  return (
    <section>
    <div>
      <h1>Create Rate</h1>
    </div>
    <form onSubmit={handleCreateRate}>
      <label>
        Value:
        <input type="number" name="value" />
      </label>
      <label>
        Comment:
        <input type="text" name="comment" />
      </label>
      <label>
        Topics:
        <input type="text" name="topics" defaultValue="politics" />
      </label>
      <label>
        Anon:
        <input type="checkbox" name="anon"/>
      </label>

      <button type="submit">Submit</button>
    </form>
    </section>
  )
}