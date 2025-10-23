import Header from './_Header'

export default function Signup() {
  return (
    <div className="container">
      <Header />
      <div className="auth-wrap card">
        <h2 style={{marginTop:0}}>Create account</h2>
        <form method="post" action="/signup">
          <div className="form-row">
            <label>Name</label>
            <input className="input" type="text" name="name" required />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" name="email" required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" name="password" required />
          </div>
          <div className="actions">
            <a className="btn btn-ghost" href="/login">Back</a>
            <button className="btn btn-primary" type="submit">Continue →</button>
          </div>
        </form>
      </div>
    </div>
  )
}
