/*
# Create bulk insert function for F1 data

## Purpose
Allows inserting all F1 driver/team/circuit data from a single JSON payload,
avoiding the need for hundreds of individual INSERT statements.

## Functions
- bulk_insert_f1_drivers(json_data text) - inserts drivers from JSON array
- bulk_insert_f1_teams(json_data text) - inserts teams from JSON array  
- bulk_insert_f1_circuits(json_data text) - inserts circuits from JSON array

Each function truncates the target table first, then inserts all rows from the JSON.
*/

CREATE OR REPLACE FUNCTION bulk_insert_f1_drivers(json_data text)
RETURNS void AS $$
BEGIN
  DELETE FROM f1_drivers;
  INSERT INTO f1_drivers (name, nationality, flag, championships, wins, poles, podiums, entries, years_active, teams, bio, photo_url)
  SELECT 
    elem->>'name',
    elem->>'nationality',
    elem->>'flag',
    (elem->>'championships')::int,
    (elem->>'wins')::int,
    (elem->>'poles')::int,
    (elem->>'podiums')::int,
    (elem->>'entries')::int,
    elem->>'years_active',
    elem->>'teams',
    elem->>'bio',
    elem->>'photo_url'
  FROM json_array_elements(json_data::json) AS elem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION bulk_insert_f1_teams(json_data text)
RETURNS void AS $$
BEGIN
  DELETE FROM f1_teams;
  INSERT INTO f1_teams (name, full_name, nationality, flag, championships, wins, poles, podiums, entries, years_active, engine, headquarters, bio, logo_url)
  SELECT 
    elem->>'name',
    elem->>'full_name',
    elem->>'nationality',
    elem->>'flag',
    (elem->>'championships')::int,
    (elem->>'wins')::int,
    (elem->>'poles')::int,
    (elem->>'podiums')::int,
    (elem->>'entries')::int,
    elem->>'years_active',
    elem->>'engine',
    elem->>'headquarters',
    elem->>'bio',
    elem->>'logo_url'
  FROM json_array_elements(json_data::json) AS elem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION bulk_insert_f1_circuits(json_data text)
RETURNS void AS $$
BEGIN
  DELETE FROM f1_circuits;
  INSERT INTO f1_circuits (name, country, flag, length, laps, lap_record, record_holder, gp_name, first_held, last_held, races_held, map_url)
  SELECT 
    elem->>'name',
    elem->>'country',
    elem->>'flag',
    elem->>'length',
    (elem->>'laps')::int,
    elem->>'lap_record',
    elem->>'record_holder',
    elem->>'gp_name',
    (elem->>'first_held')::int,
    NULLIF(elem->>'last_held', '')::int,
    (elem->>'races_held')::int,
    elem->>'map_url'
  FROM json_array_elements(json_data::json) AS elem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;