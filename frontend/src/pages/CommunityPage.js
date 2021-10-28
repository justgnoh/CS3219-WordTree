import React from 'react'
import { Table, Button, Badge } from 'react-bootstrap';

export default function CommunityPage() {
    return (
        <div>
            <div className="d-flex justify-content-center">
            <h1>Welcome to the Treehouse!</h1>
            </div>
            <div className="d-flex justify-content-center">
            <h5>Here are a list of completed essays that you can read. Upvote if you think an essay is great or speaks to you!</h5>
            </div>
                <Table responsive>
                <thead>
                    <tr>
                    <th>Upvotes</th>
                    <th>Title</th>
                    <th>Genres</th>
                    <th>Authors</th>
                    <th>Date Completed</th>
                    <th>Turns</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>128</td>
                        <td>The Blood red Sky</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Horror</Badge>
                            <Badge pill bg="warning" className="black-text">Sci-Fi</Badge>
                        </td>
                        <td>
                           Arthur, Jessie
                        </td>
                        <td>
                            19/09/2021
                        </td>
                        <td>
                            4
                        </td>
                        <td>
                            <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                            console.log("history.push");
                            }}>View</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>72</td>
                        <td>Hash Slinging Slayer</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Crime</Badge>
                        </td>
                        <td>
                            Bob, Alice
                        </td>
                        <td>
                            24/08/2021
                        </td>
                        <td>
                            6   
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color">View</Button>
                        </td>
                    </tr>
                    
                    <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>

                </tbody>
            </Table>
        </div>
    )
}
