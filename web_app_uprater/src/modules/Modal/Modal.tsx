interface ITabComposition {
  Title: React.FC<any>
  Body: React.FC<any>
  Footer: React.FC<any>
}

export const Modal: React.FC<{open: boolean, children: React.ReactNode}> & ITabComposition = ({ open, children }) => {

  return (
    <dialog open={open} className="rounded-md p-6">
      <div className="">
        {children}
      </div>
    </dialog>
  )
}


const Title: React.FC<any> = ({ children }) => {
  return (
    <h1 className="text-2xl font-bold">{children}</h1>
  )
}


const Body: React.FC<any> = ({ children, className }) => {
  return (
    <div className={`text-sm ${className}`}>{children}</div>
  )
}

const Footer: React.FC<any> = ({ children }) => {
  return (
    <div className="flex justify-end">{children}</div>
  )
}

Modal.Footer = Footer
Modal.Body = Body
Modal.Title = Title