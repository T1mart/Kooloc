-- ===========================
-- Table: users
-- ===========================
CREATE TABLE users (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nick_name    VARCHAR(255) NOT NULL,
    full_name    VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    email        VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255) NOT NULL
);

-- ===========================
-- Table: kooloc
-- ===========================
CREATE TABLE kooloc (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    participants BIGINT,
    description  TEXT
);

-- ===========================
-- Table: transactions
-- ===========================
CREATE TABLE transactions (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kooloc_id    BIGINT NOT NULL,
    date         DATE NOT NULL,
    participants BIGINT,
    description  TEXT,
    CONSTRAINT fk_transactions_kooloc
        FOREIGN KEY (kooloc_id) REFERENCES kooloc (id) ON DELETE CASCADE
);

-- ===========================
-- Table: messages
-- ===========================
CREATE TABLE messages (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kooloc_id  BIGINT NOT NULL,
    author     BIGINT NOT NULL,
    date       DATE NOT NULL,
    content    TEXT,
    CONSTRAINT fk_messages_kooloc
        FOREIGN KEY (kooloc_id) REFERENCES kooloc (id) ON DELETE CASCADE,
    CONSTRAINT fk_messages_author
        FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE
);

-- ===========================
-- Table: events
-- ===========================
CREATE TABLE events (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kooloc_id   BIGINT NOT NULL,
    type        INTEGER,
    author      BIGINT NOT NULL,
    title       VARCHAR(255),
    description TEXT,
    start_date  DATE,
    end_date    DATE,
    CONSTRAINT fk_events_kooloc
        FOREIGN KEY (kooloc_id) REFERENCES kooloc (id) ON DELETE CASCADE,
    CONSTRAINT fk_events_author
        FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE
);

-- ===========================
-- Table: list
-- ===========================
CREATE TABLE list (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kooloc_id  BIGINT NOT NULL,
    content    TEXT,
    CONSTRAINT fk_list_kooloc
        FOREIGN KEY (kooloc_id) REFERENCES kooloc (id) ON DELETE CASCADE
);

-- ===========================
-- Junction table for kooloc participants
-- ===========================
CREATE TABLE kooloc_participants_users (
    kooloc_id BIGINT NOT NULL,
    user_id   BIGINT NOT NULL,
    PRIMARY KEY (kooloc_id, user_id),
    CONSTRAINT fk_kooloc_participant_kooloc
        FOREIGN KEY (kooloc_id) REFERENCES kooloc (id) ON DELETE CASCADE,
    CONSTRAINT fk_kooloc_participant_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- ===========================
-- Junction table for transaction participants
-- ===========================
CREATE TABLE transactions_participants_users (
    transaction_id BIGINT NOT NULL,
    user_id        BIGINT NOT NULL,
    PRIMARY KEY (transaction_id, user_id),
    CONSTRAINT fk_transaction_participant_transaction
        FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE,
    CONSTRAINT fk_transaction_participant_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
