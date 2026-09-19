import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Menu, X, Check } from "lucide-react";

const API = "http://localhost:5000/api";

type Room = {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  features: string[];
};

const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Valley Room",
    price: 6500,
    image: "/images/room-1.jpg",
    desc: "Elegant comfort with beautiful views.",
    features: ["King bed", "2 guests", "Breakfast", "Wi-Fi"],
  },
  {
    id: "premium",
    name: "Premium Pool Suite",
    price: 9500,
    image: "/images/room-2.jpg",
    desc: "A refined suite made for slow mornings.",
    features: ["King bed", "2 guests", "Pool access", "Breakfast"],
  },
  {
    id: "presidential",
    name: "Presidential Residence",
    price: 14500,
    image: "/images/room-3.jpg",
    desc: "Our signature stay with elevated service.",
    features: ["King bed", "4 guests", "Living room", "Breakfast"],
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Link className="logo" to="/" onClick={() => setOpen(false)}>
        ✦
        <span>
          AAB E-HAYAT
          <small>HOTEL & RESORT</small>
        </span>
      </Link>

      <button className="menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? "open" : ""}>
        <Link to="/rooms" onClick={() => setOpen(false)}>
          Rooms
        </Link>

        <Link to="/gallery" onClick={() => setOpen(false)}>
          Gallery
        </Link>

        <Link to="/about" onClick={() => setOpen(false)}>
          About
        </Link>

        <Link
          to="/rooms"
          className="navbook"
          onClick={() => setOpen(false)}
        >
          Book Now ↗
        </Link>
      </nav>
    </header>
  );
}

function BookingSearch() {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function search() {
    navigate(
      `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  }

  return (
    <div className="booking">
      <div>
        <label>CHECK IN</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div>
        <label>CHECK OUT</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div>
        <label>GUESTS</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>

      <button onClick={search}>
        CHECK AVAILABILITY ↗
      </button>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="heroShade" />

          <div className="heroText">
            <p>WELCOME TO AAB E-HAYAT</p>

            <h1>
              Luxury stays,
              <br />
              <i>unforgettable</i> moments.
            </h1>

            <span>
              Discover a refined escape where exceptional comfort
              meets timeless hospitality.
            </span>

            <div className="heroBtns">
              <button onClick={() => navigate("/rooms")}>
                EXPLORE ROOMS ↗
              </button>

              <button className="ghost">
                WATCH EXPERIENCE ○
              </button>
            </div>
          </div>

          <div className="heroCount">
            01 <span>/ 03</span>
          </div>

          <BookingSearch />
        </section>

        <section className="intro">
          <p>THE AAB E-HAYAT EXPERIENCE</p>

          <h2>
            A stay designed
            <br />
            around <i>you.</i>
          </h2>

          <p className="muted">
            Beautiful rooms, thoughtful service and everything
            you need for a memorable stay.
          </p>
        </section>

        <section className="amenities">
          {[
            "Premium Rooms",
            "Fine Dining",
            "Relax & Rejuvenate",
            "Prime Location",
            "24/7 Support",
          ].map((item, index) => (
            <div key={item}>
              <b>0{index + 1}</b>
              <span>{item}</span>
            </div>
          ))}
        </section>

        <RoomsPreview />
      </main>

      <Footer />
    </>
  );
}

function RoomsPreview() {
  const navigate = useNavigate();

  return (
    <section className="roomsSec">
      <div className="sectionTop">
        <div>
          <p>OUR ROOMS</p>

          <h2>
            Stay in <i>style.</i>
          </h2>
        </div>

        <button onClick={() => navigate("/rooms")}>
          VIEW ALL ROOMS ↗
        </button>
      </div>

      <div className="roomGrid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <article className="roomCard">
      <img src={room.image} alt={room.name} />

      <div>
        <p>{room.name}</p>

        <h3>
          ₹{room.price.toLocaleString()}
          <small> / night</small>
        </h3>

        <span>{room.desc}</span>

        <Link to={`/room/${room.id}`}>
          VIEW ROOM ↗
        </Link>
      </div>
    </article>
  );
}

function Rooms() {
  return (
    <>
      <Navbar />

      <div className="pageHead">
        <p>AAB E-HAYAT</p>

        <h1>
          Our <i>rooms.</i>
        </h1>

        <span>
          Choose your stay and check room availability.
        </span>
      </div>

      <section className="roomsPage">
        <BookingSearch />

        <div className="roomGrid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function RoomDetails() {
  const { id } = useParams();

  const room =
    rooms.find((item) => item.id === id) || rooms[0];

  return (
    <>
      <Navbar />

      <section className="detail">
        <img src={room.image} alt={room.name} />

        <div className="detailInfo">
          <p>{room.name}</p>

          <h1>{room.name}</h1>

          <h2>
            ₹{room.price.toLocaleString()}
            <small> / night</small>
          </h2>

          <span>{room.desc}</span>

          <div className="features">
            {room.features.map((feature) => (
              <div key={feature}>
                <Check size={16} />
                {feature}
              </div>
            ))}
          </div>

          <Link
            className="primary"
            to={`/booking/${room.id}`}
          >
            BOOK THIS ROOM ↗
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Booking() {
  const { id } = useParams();

  const room =
    rooms.find((item) => item.id === id) || rooms[0];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.id,
          name,
          email,
          phone,
          checkIn,
          checkOut,
          guests,
        }),
      });

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch {
      setMessage(
        "Unable to connect to booking server."
      );
    }
  }

  return (
    <>
      <Navbar />

      <section className="bookingPage">
        <div>
          <p>RESERVE YOUR STAY</p>

          <h1>
            Book <i>{room.name}</i>
          </h1>

          <span>
            Complete your details to reserve your room.
          </span>
        </div>

        <form onSubmit={submit}>
          <input
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="formRow">
            <input
              required
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <input
              required
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

          <button className="primary" type="submit">
            CONFIRM BOOKING ↗
          </button>

          {message && (
            <strong className="success">
              {message}
            </strong>
          )}
        </form>
      </section>

      <Footer />
    </>
  );
}

function Gallery() {
  const images = [
    "gallery-1.jpg",
    "gallery-2.jpg",
    "gallery-3.jpg",
    "gallery-4.jpg",
    "room-1.jpg",
    "room-2.jpg",
  ];

  return (
    <>
      <Navbar />

      <div className="pageHead">
        <p>THE GALLERY</p>

        <h1>
          Moments worth <i>remembering.</i>
        </h1>
      </div>

      <div className="gallery">
        {images.map((image) => (
          <img
            key={image}
            src={`/images/${image}`}
            alt="AAB E-HAYAT"
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

function About() {
  return (
    <>
      <Navbar />

      <div className="pageHead">
        <p>ABOUT AAB E-HAYAT</p>

        <h1>
          Hospitality with <i>heart.</i>
        </h1>

        <span>
          A refined hotel experience built around comfort,
          calm and memorable moments.
        </span>
      </div>

      <section className="about">
        <img src="/images/hero.jpg" alt="AAB E-HAYAT" />

        <div>
          <p>OUR STORY</p>

          <h2>
            A beautiful place to <i>slow down.</i>
          </h2>

          <span>
            AAB E-HAYAT brings together thoughtful design,
            warm hospitality and an atmosphere made for
            meaningful stays.
          </span>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <div className="logo">
          ✦
          <span>
            AAB E-HAYAT
            <small>HOTEL & RESORT</small>
          </span>
        </div>

        <p>Luxury stays. Unforgettable moments.</p>
      </div>

      <div>
        <p>QUICK LINKS</p>

        <Link to="/rooms">Rooms</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about">About</Link>
      </div>

      <div>
        <p>CONTACT</p>

        <span>reservations@aabehiyat.com</span>
        <span>+91 99999 99999</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}