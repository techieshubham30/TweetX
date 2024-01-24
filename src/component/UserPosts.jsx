import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FirebaseContext } from "../context/Firebase";
import { fetchUserPosts } from "../utils/fetchUserPosts";

// const UserPosts = () => {
//   const { firestore, userProfileData } = useContext(FirebaseContext);

//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     fetchUserPosts(firestore, userProfileData, setUserPosts);
//   }, [firestore, userProfileData]);
//   return (
//     <Container>
//       <Row className="mt-4">
//         <Col md={{ span: 6, offset: 3 }}>
//           <h2>Your Posts</h2>
//           {userPosts.length === 0 ? (
//             <p>No posts yet. Start posting!</p>
//           ) : (
//             userPosts.map((post) => (
//               <Card key={post.postId} className="mb-3">
//                 <Card.Body>
//                   <Row>
//                     <Col>
//                       <img
//                         src={userProfileData.profilePic}
//                         alt="Profile Pic"
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           borderRadius: "50%",
//                         }}
//                       />
//                     </Col>
//                     <Col>
//                       <Card.Text>{post.text}</Card.Text>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card>
//             ))
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserPosts;

const UserPosts = ({ userPosts, showAllPosts }) => {
  console.log(userPosts);
  const { userProfileData } = useContext(FirebaseContext);
  const currentUserId = userProfileData.uid;

  const filteredPosts = showAllPosts
    ? userPosts
    : userPosts.filter((post) => post.uid === currentUserId);

  console.log("filteredPosts", userPosts);
  console.log("showAllPosts", showAllPosts);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>{showAllPosts ? "All Posts" : "Your Posts"}</h2>
          {filteredPosts.length === 0 ? (
            <p>
              No posts yet.{" "}
              {showAllPosts ? "Start exploring!" : "Start posting!"}
            </p>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.postId} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col>
                      <img
                        src={userProfileData.profilePic}
                        alt="Profile Pic"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </Col>
                    <Col>
                      <Card.Text>{post.text}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPosts;
