import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Spinner, Alert, Image, Nav, Button, Navbar } from "react-bootstrap";
import { profile } from "../../Services/authservice";
import AddNewMovie from "../AddNewmovie";
import AddNewCategorie from "../AddNewCategorie";
import CategoriesList from "../CategoriesList";

function Dashboard() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await profile();
        if (data) {
          setUserdata(data);
          setName(data.name || localStorage.getItem("name"));
          setEmail(data.email || localStorage.getItem("email"));
          setRole(data.role || localStorage.getItem("role") || "Rôle inconnu");
          setAvatar(data.avatar || localStorage.getItem("avatar"));
        } else {
          throw new Error("No user data received.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Navbar bg="dark" variant="dark" id="dashboard-navbar">
              <Navbar.Brand>Dashboard</Navbar.Brand>
              <Nav className="d-flex flex-row align-items-center">

                <Nav.Item>
                  <Nav.Link href="/CategoriesList" className="text-white">
                   <Button variant="warning" >
                   Categories
                                  </Button>
                  </Nav.Link>
                </Nav.Item>
                {role === "admin" && (
                  <>
                    <Nav.Item style={{ paddingRight:"10px"}}>
                    <AddNewMovie/>
                    </Nav.Item  >
                    <Nav.Item style={{ paddingRight:"10px"}}>
                    <AddNewCategorie/>
                    </Nav.Item>
                  </>
                )}
              </Nav>
            </Navbar>



            <Card.Body>
           
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <div className="text-start">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 className="text-primary-center" style={{ marginLeft: 300 }}>
                       {name}
                    </h3>
                    <Image
                      src={avatar}
                      roundedCircle
                      style={{
                        marginRight:"300px",
                        height: "100px",
                        objectFit: "cover",
                        marginBottom: "15px",
                      }}
                    />
                  </div>
                  <p className="text-dark "><strong>Email :</strong> {email}</p>
                  <p className="text-dark"><strong>Rôle :</strong> {role}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
