import React, { useState } from 'react';
import Recipies from './Recipies';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Container,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';
import { Link as RRLink } from 'react-router-dom';

const Main = () => {
    const [user_input, setInput] = useState('');
    let history = useHistory();
    const onChange = e => {
        setInput(e);
    };
    const handleKeyPress = target => {
        if (target.charCode === 13) {
            history.push(`/search/${user_input}`);
        }
    };
    return (
        <div>
            <main role="main">
                <Jumbotron className="text-center">
                    <Container>
                        <h1 className="jumbotron-heading">Sandwich Search </h1>
                        <p className="lead text-muted">
                            Enter ingredients by separating with comma you want
                            to search for
                        </p>
                        <div>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button
                                        tag={RRLink}
                                        to={`/search/${user_input}`}
                                    >
                                        Search
                                    </Button>
                                </InputGroupAddon>
                                <Input
                                    placeholder="e.g. Sugar,Salt,Water,Tomato & e.g. Big Mac"
                                    onChange={e =>
                                        onChange(`${e.target.value}`)
                                    }
                                    onKeyPress={handleKeyPress}
                                />
                            </InputGroup>
                        </div>
                    </Container>
                </Jumbotron>
                <Recipies />
            </main>
        </div>
    );
};

export default Main;
