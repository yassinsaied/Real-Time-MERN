import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchDevices } from "../api/deviceService";
import DeviceDetail from "./deviceDetail";

function DevicesList() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { data, error, isLoading } = useQuery("devices", fetchDevices);

  const handleCloseDetail = () => {
    setSelectedDevice(null);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="px-2" href="#home">
          Tableau de bord de surveillance des appareils
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={3}>
            <h4 className="my-3">Appareils</h4>
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <Spinner animation="border" variant="primary" />
              </div>
            ) : error ? (
              <div>Erreur lors du chargement des appareils</div>
            ) : (
              <ListGroup>
                {data.map((device) => (
                  <ListGroup.Item
                    key={device._id}
                    action
                    onClick={() => setSelectedDevice(device.deviceName)}
                    active={selectedDevice === device.deviceName}
                  >
                    {device.deviceName} -{" "}
                    <Badge bg={device.state === "ON" ? "success" : "danger"}>
                      {device.state}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={9}>
            {selectedDevice && (
              <DeviceDetail
                deviceName={selectedDevice}
                onClose={handleCloseDetail}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DevicesList;
