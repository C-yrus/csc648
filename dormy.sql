--
-- PostgreSQL database dump
--

-- Dumped from database version 10.7
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-04 20:46:46 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 61060)
-- Name: listings; Type: TABLE; Schema: public; Owner: dormyuser
--

CREATE TABLE public.listings (
    id integer NOT NULL,
    title text,
    address text,
    beds integer,
    baths integer,
    rent integer,
    distance integer,
    type text,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    thumbnail text,
    description text
);


ALTER TABLE public.listings OWNER TO dormyuser;

--
-- TOC entry 196 (class 1259 OID 61058)
-- Name: listings_id_seq; Type: SEQUENCE; Schema: public; Owner: dormyuser
--

CREATE SEQUENCE public.listings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listings_id_seq OWNER TO dormyuser;

--
-- TOC entry 3160 (class 0 OID 0)
-- Dependencies: 196
-- Name: listings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.listings_id_seq OWNED BY public.listings.id;


--
-- TOC entry 201 (class 1259 OID 61390)
-- Name: messages; Type: TABLE; Schema: public; Owner: dormyuser
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    from_name text,
    from_email text,
    message text,
    listing_id integer,
    created date,
    user_id integer
);


ALTER TABLE public.messages OWNER TO dormyuser;

--
-- TOC entry 200 (class 1259 OID 61388)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: dormyuser
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO dormyuser;

--
-- TOC entry 3161 (class 0 OID 0)
-- Dependencies: 200
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 199 (class 1259 OID 61071)
-- Name: users; Type: TABLE; Schema: public; Owner: dormyuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text,
    last_name text,
    email text,
    password text,
    phone text,
    created timestamp without time zone
);


ALTER TABLE public.users OWNER TO dormyuser;

--
-- TOC entry 198 (class 1259 OID 61069)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dormyuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dormyuser;

--
-- TOC entry 3162 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3013 (class 2604 OID 61063)
-- Name: listings id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings ALTER COLUMN id SET DEFAULT nextval('public.listings_id_seq'::regclass);


--
-- TOC entry 3016 (class 2604 OID 61393)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3015 (class 2604 OID 61074)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3150 (class 0 OID 61060)
-- Dependencies: 197
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.listings (id, title, address, beds, baths, rent, distance, type, created, user_id, thumbnail, description) FROM stdin;
34	Cozy House Near SFSU Campus!	440 Winston Drive, San Francisco, CA 94105	3	2	3900	\N	house	2019-05-02 19:58:52.679866	15	thumbnail-1556852332676.jpeg	This 3 bedroom, 2 bathroom house is perfect for students needing a place for the year. We can sign a minimum of 1 year lease. You can have up to 5 people in the unit. Please kindly contact me if you are interested.
35	Small Studio Condo With 1 Bedroom and 1 Bath, Massive Living Rom	1234 Santa Rd, Los Altos, CA 94024	1	1	4500	\N	condo	2019-05-04 18:10:51.618131	15	thumbnail-1557018651561.jpeg	This place is great
\.


--
-- TOC entry 3154 (class 0 OID 61390)
-- Dependencies: 201
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.messages (id, from_name, from_email, message, listing_id, created, user_id) FROM stdin;
\.


--
-- TOC entry 3152 (class 0 OID 61071)
-- Dependencies: 199
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.users (id, first_name, last_name, email, password, phone, created) FROM stdin;
15	Matt	Massoodi	m@m.com	$2b$10$eBeJuqanvE7jrhVk4KBInO7rmbzSJ/r0NqkHtN8sJO163ORhfEGgu	408-391-6592	2019-05-02 18:31:19.284113
\.


--
-- TOC entry 3163 (class 0 OID 0)
-- Dependencies: 196
-- Name: listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.listings_id_seq', 35, true);


--
-- TOC entry 3164 (class 0 OID 0)
-- Dependencies: 200
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.messages_id_seq', 10, true);


--
-- TOC entry 3165 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- TOC entry 3018 (class 2606 OID 61068)
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- TOC entry 3024 (class 2606 OID 61398)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3020 (class 2606 OID 61283)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3022 (class 2606 OID 61079)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3025 (class 2606 OID 61080)
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3026 (class 2606 OID 61399)
-- Name: messages messages_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id);


--
-- TOC entry 3027 (class 2606 OID 61409)
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2019-05-04 20:46:47 PDT

--
-- PostgreSQL database dump complete
--

