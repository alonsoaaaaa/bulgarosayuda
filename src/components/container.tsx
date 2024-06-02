function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-[1100px] mx-auto">{children}</div>
  )
}

export default Container