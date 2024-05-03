
const defaultClass = 'aspect-square rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 flex justify-center items-center shadow-md'
const CircleButton = (props: any) => {

  return (
    <button 
    {...props}
    className={props.className ? `${defaultClass} ${props.className}` : defaultClass}>
      {props.children}
    </button>
  )
}

export default CircleButton