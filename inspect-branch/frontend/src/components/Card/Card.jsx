import "./Card.css";

function Card({ image, title, price }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={title} />
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price}</p>
      <button className="card-button">Add to Cart</button>
    </div>
  );
}

export default Card;
