import React from 'react'
import { Button, Card, Table, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router';

export default function ChallengePage() {
    const history = useHistory();

    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button variant="dark" className="primary-color me-3">Create a new challenge request</Button>
                <Button variant="dark" className="primary-color">View challenge requests</Button>
            </div>

            <Table responsive>
                <thead>
                    <tr>
                    <th>Display</th>
                    <th>Username</th>
                    <th>Genres</th>
                    <th>Turns</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr onClick={() => console.log("clicked on row")}>
                        <td>dp</td>
                        <td>Arthur</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Horror</Badge>
                            <Badge pill bg="warning" className="black-text">Sci-Fi</Badge>
                        </td>
                        <td>
                            2/4 rounds
                        </td>
                        <td>
                            <Badge pill bg="success">Your Turn</Badge>
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                            history.push("/challenge/arthur");
                        }}>View</Button>
                        </td>
                    </tr>
                    <tr onClick={() => console.log("clicked on row")}>
                        <td>dp</td>
                        <td>Kevin</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Crime</Badge>
                        </td>
                        <td>
                            3/6 rounds
                        </td>
                        <td>
                            <Badge pill bg="danger">Awaiting Turn</Badge>
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color">View</Button>
                        </td>
                    </tr>

                </tbody>
            </Table>
            
        </div>
    )
}
