import React, { useState, useEffect } from 'react';
import RecipieDataService from '../../services/RecipieService';
import { Link } from 'react-router-dom';
import {
    Button,
    // ButtonGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';

const Album = ({ album }) => {
    const [recipies, setRecipies] = useState([]);
    const [currentRecipie, setCurrentRecipie] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveRecipies();
    }, []);

    const retrieveRecipies = () => {
        RecipieDataService.getAll()
            .then(response => {
                setRecipies(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveRecipies();
        setCurrentRecipie(null);
        setCurrentIndex(-1);
    };

    const setActiveRecipie = (Recipie, index) => {
        setCurrentRecipie(Recipie);
        setCurrentIndex(index);
    };

    return (
        <div className="recipies py-5 bg-light">
            <Container>
                <Row>
                    {recipies.slice(0, 6).map((recipie, index) => {
                        return (
                            <Col md="4" key={index}>
                                <Card className="mb-4 box-shadow">
                                    <CardImg
                                        top
                                        width="180" 
                                        height="250"
                                        src={recipie.imgURL}
                                    />
                                    <CardBody className="text-center">
                                        {/*THERE WILL AN item OBJECT IN DATABASE AND IT WILL BE PRINTED IN HERE*/}
                                        <CardText><strong >{recipie.name}</strong></CardText>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                href="#"
                                                variant = "outline-dark"
                                                color="secondary"
                                                size="lg"
                                                block
                                            >
                                            <strong>Show</strong>
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Album;