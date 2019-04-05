--
-- PostgreSQL database dump
--

-- Dumped from database version 10.7
-- Dumped by pg_dump version 11.2

-- Started on 2019-04-04 21:56:44 PDT

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
    thumbnail text
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
-- TOC entry 3172 (class 0 OID 0)
-- Dependencies: 196
-- Name: listings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.listings_id_seq OWNED BY public.listings.id;


--
-- TOC entry 201 (class 1259 OID 61087)
-- Name: messages; Type: TABLE; Schema: public; Owner: dormyuser
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    content text,
    created timestamp without time zone,
    status text,
    listing_id integer,
    user_id integer
);


ALTER TABLE public.messages OWNER TO dormyuser;

--
-- TOC entry 200 (class 1259 OID 61085)
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
-- TOC entry 3173 (class 0 OID 0)
-- Dependencies: 200
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 203 (class 1259 OID 61108)
-- Name: responses; Type: TABLE; Schema: public; Owner: dormyuser
--

CREATE TABLE public.responses (
    id integer NOT NULL,
    content text,
    created timestamp without time zone,
    message_id integer,
    user_id integer
);


ALTER TABLE public.responses OWNER TO dormyuser;

--
-- TOC entry 202 (class 1259 OID 61106)
-- Name: responses_id_seq; Type: SEQUENCE; Schema: public; Owner: dormyuser
--

CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.responses_id_seq OWNER TO dormyuser;

--
-- TOC entry 3174 (class 0 OID 0)
-- Dependencies: 202
-- Name: responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;


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
-- TOC entry 3175 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dormyuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3020 (class 2604 OID 61063)
-- Name: listings id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings ALTER COLUMN id SET DEFAULT nextval('public.listings_id_seq'::regclass);


--
-- TOC entry 3023 (class 2604 OID 61090)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3024 (class 2604 OID 61111)
-- Name: responses id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);


--
-- TOC entry 3022 (class 2604 OID 61074)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3160 (class 0 OID 61060)
-- Dependencies: 197
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.listings (id, title, address, beds, baths, rent, distance, type, created, user_id, thumbnail) FROM stdin;
20	Apartment 1	Apartment 1	2	2	15	2	apartment	2019-04-04 21:36:12.221656	\N	thumbnail-1554438972204.png
21	Apartment 2	Apartment 2	2	2	9030	5	apartment	2019-04-04 21:37:31.843497	\N	thumbnail-1554439051826.png
22	Apartment 3	Apartment 3	3	3	15000	3	house	2019-04-04 21:38:03.329711	\N	thumbnail-1554439083302.png
23	Apartment 4	Apartment 4	4	4	9000	1	apartment	2019-04-04 21:39:17.536579	\N	thumbnail-1554439157526.png
24	Apartment 5	Apartment 5	9	9	90099	10	condo	2019-04-04 21:40:05.216074	\N	thumbnail-1554439205206.png
25	Condo 1	Condo 1	7	7	712	1	condo	2019-04-04 21:40:57.419145	\N	thumbnail-1554439257410.png
26	House 3	House 3	3	3	33	3	house	2019-04-04 21:43:33.311987	\N	thumbnail-1554439413301.png
19	HOUSE	House address	5	5	15000	500	house	2019-04-04 17:43:30.684646	\N	thumbnail-1554425010670.png
\.


--
-- TOC entry 3164 (class 0 OID 61087)
-- Dependencies: 201
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.messages (id, content, created, status, listing_id, user_id) FROM stdin;
\.


--
-- TOC entry 3166 (class 0 OID 61108)
-- Dependencies: 203
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.responses (id, content, created, message_id, user_id) FROM stdin;
\.


--
-- TOC entry 3162 (class 0 OID 61071)
-- Dependencies: 199
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dormyuser
--

COPY public.users (id, first_name, last_name, email, password, phone, created) FROM stdin;
\.


--
-- TOC entry 3176 (class 0 OID 0)
-- Dependencies: 196
-- Name: listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.listings_id_seq', 26, true);


--
-- TOC entry 3177 (class 0 OID 0)
-- Dependencies: 200
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 202
-- Name: responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.responses_id_seq', 1, false);


--
-- TOC entry 3179 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dormyuser
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3026 (class 2606 OID 61068)
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- TOC entry 3030 (class 2606 OID 61095)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3032 (class 2606 OID 61116)
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);


--
-- TOC entry 3028 (class 2606 OID 61079)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3033 (class 2606 OID 61080)
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3034 (class 2606 OID 61096)
-- Name: messages messages_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id);


--
-- TOC entry 3035 (class 2606 OID 61101)
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3036 (class 2606 OID 61117)
-- Name: responses responses_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id);


--
-- TOC entry 3037 (class 2606 OID 61122)
-- Name: responses responses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dormyuser
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2019-04-04 21:56:45 PDT

--
-- PostgreSQL database dump complete
--

