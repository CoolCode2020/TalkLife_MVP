DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'admin'
   ) THEN
      CREATE ROLE admin LOGIN PASSWORD 'admin';
   END IF;
END
$$;

SELECT 'CREATE DATABASE talklife_db OWNER admin'
WHERE NOT EXISTS (
   SELECT FROM pg_database WHERE datname = 'talklife_db'
)\gexec