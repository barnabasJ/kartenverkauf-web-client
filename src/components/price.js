const Price = ({ price }) => {
  const euro = price / 100
  const cent = price % 100
  return <span>{`${euro}.${cent} Euro`}</span>
}

export default Price
