export default function Header({ title = 'Welcome to AI Crypto Advisor', subtitle = "Let's personalize your experience" }) {
  return (
    <div className="header-center">
      <img src="/src/assets/logo.svg" className="logo-badge" alt="logo" />
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  )
}
