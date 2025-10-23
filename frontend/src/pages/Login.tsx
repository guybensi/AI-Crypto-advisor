import Header from './_Header'

export default function Login() {
  return (
    <div className="container">
      <Header />
      <div className="auth-wrap card">
        <h2 style={{marginTop:0}}>Sign in</h2>
        <form method="post" action="/login">
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" name="email" required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" name="password" required />
            <div className="helper">
              Don’t have an account? <a className="link" href="/signup">Create one</a>.
            </div>
          </div>
          <div className="actions">
            <span />
            <button className="btn btn-primary" type="submit">Continue →</button>
          </div>
        </form>
      </div>
    </div>
  )
}
