import React from 'react'
import { Card, Table, Badge, Button, InputGroup, FormControl, Breadcrumb } from 'react-bootstrap'

export default function Challenge() {
    return (
        <div>
            <h1>Ongoing Challenge</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                <Breadcrumb.Item active>Arthur #16604123</Breadcrumb.Item>
                </Breadcrumb>
            {/* Add Breadcrumbs */}

             <Table responsive>
                <thead>
                    <tr>
                    <th>Display</th>
                    <th>Username</th>
                    <th>Genres</th>
                    <th>Turns</th>
                    <th>Status</th>
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
                    </tr>
                </tbody>
            </Table>

            <Card>
                <Card.Header>Story thus far...</Card.Header>
                <Card.Body>    
                    <Card.Text>
                        (GET ESSAY thus far from Essay Service)
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Card.Text>
                </Card.Body>
            </Card>
            
            <div className="d-flex justify-content-center">
                <div className="challenge-nut">
                    <Card style={{ width: '70vh', height:'100%' }}>
                        <Card.Header>Today's Prompt</Card.Header>
                            <Card.Body>    
                                <Card.Text>
                                    (GET WORDS from Essay Service)
                                    <br></br>
                                    <Badge pill bg="warning" className="black-text me-3">Word1</Badge>
                                    <Badge pill bg="warning" className="black-text me-3">Word2</Badge>
                                    <Badge pill bg="warning" className="black-text me-3">Word3</Badge>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                </div>
            
            <div className="challenge-nut">
                <Card style={{ width: '45vh', height:'100%' }}>
                    <Card.Header>Round Statistics</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            (GET STATS from Challenge Service)
                            <br></br>
                            Time Left: 20h 31m left
                            <br></br>
                            Word Count: 6/100 (use state)
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
            <div className="challenge-nut">
            <Card style={{ width: '30vh', height:'100%' }}>
                <Card.Header>Nuts Earned</Card.Header>
                <Card.Body>
                    <Card.Text>
                        (GET NUTS from Nut Service)
                        <br></br>
                        <div className="d-flex justify-content-center">
                            <h1>2</h1>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>

            </div>

            <InputGroup className="mb-3 mt-3    ">
                <textarea style={{width:'100%', minHeight:'30vh'}} placeholder="Input your story here..."/>
            </InputGroup>

        <div className="d-flex flex-row-reverse">
            <Button variant="dark" size="sm" className="primary-color">Submit</Button>
            <Button variant="dark" size="sm" className="primary-color">Save as Draft</Button>
        </div>
           

        </div>
    )
}
