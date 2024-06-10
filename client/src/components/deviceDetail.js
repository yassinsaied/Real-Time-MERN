import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchDeviceDetail, toggleDeviceState } from "../api/deviceService";
import { Card, Button, ListGroup, Spinner, Alert } from "react-bootstrap";

function DeviceDetail({ deviceName, onClose }) {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(["device", deviceName], () =>
    fetchDeviceDetail(deviceName)
  );

  const mutation = useMutation(toggleDeviceState, {
    onSuccess: () => {
      queryClient.invalidateQueries(["device", deviceName]);
    },
  });

  const handleToggle = () => {
    const newState = data.state === "ON" ? "OFF" : "ON";
    mutation.mutate({ deviceName, newState });
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        Erreur lors du chargement des appareils
      </Alert>
    );
  }

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>{data.deviceName}</span>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Current Power:</strong> {data.currentPower}
        </Card.Text>
        <Card.Text>
          <strong>Total Power Consumption:</strong> {data.totalPowerConsumption}
        </Card.Text>
        <Card.Text>
          <strong>State:</strong> {data.state}
        </Card.Text>
        <Button
          variant={data.state === "ON" ? "danger" : "success"}
          onClick={handleToggle}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            `Turn ${data.state === "ON" ? "OFF" : "ON"}`
          )}
        </Button>
      </Card.Body>
      <Card.Footer>
        <h5>History</h5>
        {mutation.error && (
          <Alert variant="danger">
            Une erreur s'est produite lors de la mise à jour de l'état de
            l'appareil
            {mutation.error.message}
          </Alert>
        )}
        <ListGroup>
          {data.history.map((record) => (
            <ListGroup.Item key={record._id}>
              {new Date(record.timestamp).toLocaleString()}:
              {record.currentPower} - {record.totalPowerConsumption} -
              {record.state}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Footer>
    </Card>
  );
}

export default DeviceDetail;
