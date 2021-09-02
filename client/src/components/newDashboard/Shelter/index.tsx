import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import {
  Container,
  Image,
  Info,
  Actions,
  Filters,
  Numbers,
  Details,
  Card,
  Wrapper,
} from './styles';
import { Button } from '../StyledComponents/buttons';

interface Props {
  id: number;
  key: number;
  name: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  thumbnail_url: string;
  website_url: string;
  capacity: number;
  couples: boolean;
  female_only: boolean;
  male_only: boolean;
  family: boolean;
  pets: boolean;
  confirmedReservations: number;
}

const filters = (boolean) => (boolean ? '/img/yes.svg' : '/img/no.svg');

const Shelter = (props: Props) => {
  const [liveBedAvailability, setLiveBedAvailability] = useState(
    Number(props.capacity) - Number(props.confirmedReservations)
  );

  // https://www.valentinog.com/blog/socket-react/
  // on initial render, set a socket event listener listening for live bed availability events
  useEffect(() => {
    const socket = io('http://localhost:8080', {
      reconnectionAttempts: 10,
      path: '/socket/',
    });

    // each shelter card listens for "updateBedAvailability" socket event emitted from backend
    socket.on('updateBedAvailability', (data) => {
      if (data[0].shelter_id === props.id) {
        setLiveBedAvailability((prev) => (prev -= 1));
      }
      // if shelter_id = current shelter_id, decrement bed availability
    });

    // Close socket connection on component unmount
    return (): void => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Image>
        <img src={props.thumbnail_url} alt='shelter' />
      </Image>

      <Info>
        <h2>{props.name}</h2>

        <Filters>
          <span>
            <h4>female</h4>
            <img src={filters(props.female_only)} alt='female only' />
          </span>
          <span>
            <h4>male</h4>
            <img src={filters(props.male_only)} alt='male only' />
          </span>
          <span>
            <h4>couples</h4>
            <img src={filters(props.couples)} alt='couples' />
          </span>
          <span>
            <h4>families</h4>
            <img src={filters(props.family)} alt='family' />
          </span>
          <span>
            <h4>pets</h4>
            <img src={filters(props.pets)} alt='pets' />
          </span>
        </Filters>

        <Details>
          <span>
            <img src='/img/location.svg' alt='location' />
            <p>
              {props.street_address}, {props.city}/{props.province},{' '}
              {props.postal_code}
            </p>
          </span>
          <span>
            <img src='/img/phone.svg' alt='phone' />
            <p>{props.phone}</p>
          </span>
          <span>
            <img src='/img/email.svg' alt='email' />
            <p>{props.email}</p>
          </span>
          <span>
            <img src='/img/website.svg' alt='website' />
            <p>{props.website_url}</p>
          </span>
          <strong>3 km away from here!</strong>
        </Details>
      </Info>
      <Wrapper>
        <Numbers>
          <Card>
            <header>QUEUE</header>
            <strong>??</strong>
          </Card>
          <Card>
            <header>CONFIRMED</header>
            <strong>{props.confirmedReservations}</strong>
          </Card>
          <Card>
            <header>CAPACITY</header>
            <strong>{props.capacity}</strong>
          </Card>
          <Card>
            <header>BEDS LEFT</header>
            <strong>{liveBedAvailability}</strong>
          </Card>
        </Numbers>

        <Actions>
          <Button>Directions</Button>
          <Button>Reserve</Button>
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default Shelter;
