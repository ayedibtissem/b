import RatingStars from "react-rating-stars-component";
import { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const CardVisit = ({
  imageFile,
  description = "",
  title,
  _id,
  name,
  likes,
  comments = [],
  onSubmitComment = () => {},
  onSelectCard = () => {},
}) => {
 


  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [numLikes, setNumLikes] = useState(likes);
  const [rating, setRating] = useState(0);

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

 const handleLikeClick = () => {
    setNumLikes(numLikes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        author: "Anonymous",
        text: newComment.trim(),
        date: new Date().toLocaleString(),
        rating: rating,
      };
      const updatedComments = [...comments, newCommentObj];
      onSubmitComment(updatedComments);
      setNewComment("");
    }
  };
  

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSelectCard = () => {
    onSelectCard({ title, imageFile, description, numLikes, comments, rating });
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {showDescription ? (
              description
            ) : (
              `${description.slice(0, 45)}...`
            )}
            <button onClick={handleToggleDescription}>
              {showDescription ? "Show Less" : "Read More"}
            </button>
            <div className="d-flex align-items-center mt-2">
              <MDBBtn color="primary" size="sm" onClick={handleLikeClick}>
                <FaThumbsUp />
                <span className="ms-1">{numLikes}</span>
              </MDBBtn>
              <MDBBtn
                color="primary"
                size="sm"
                onClick={handleToggleComments}
              >
                <FaComment />
                <span className="ms-1">{comments.length || 0}</span>
              </MDBBtn>
            </div>
            {showComments && (
              <div className="mt-2">
              <form onSubmit={handleCommentSubmit}>
              <div className="mb-3">
              <textarea
              className="form-control"
              placeholder="Leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              />
              </div>
              <MDBBtn type="submit" color="primary" size="sm">
              Submit
              </MDBBtn>
              </form>
              {comments.length > 0 && (
              <div className="mt-2">
              {comments.map((comment, index) => (
              <div key={index} className="mb-2">
              <div className="fw-bold">{comment.author}</div>
              <div className="text-muted">
              {comment.date}{" "}
              <RatingStars
                                       count={5}
                                       value={comment.rating}
                                       size={20}
                                       activeColor="#ffd700"
                                       edit={false}
                                     />
              </div>
              <div>{comment.text}</div>
              </div>
              ))}
              </div>
              )}
              <div>
              <RatingStars
                               count={5}
                               onChange={handleRatingChange}
                               size={30}
                               activeColor="#ffd700"
                             />
              {rating > 0 && (
              <div className="mt-2">
              <MDBBtn color="primary" size="sm" onClick={handleSelectCard}>
              Submit Rating
              </MDBBtn>
              </div>
              )}
              </div>
              </div>
              )}
              </MDBCardText>
              </MDBCardBody>
              </MDBCard>
              </MDBCardGroup>
              );
              };
              
              export default CardVisit;