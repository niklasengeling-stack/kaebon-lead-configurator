-- ============================================================
-- Kaebon Lead Konfigurator — Seed Data
-- Nach schema.sql ausführen
-- ============================================================

-- Boat models
insert into boat_models (id, name, short_name, poster_desktop, poster_mobile, video_desktop, video_mobile, sort_order) values
  ('eb-eins-classic', 'Elektroboot Eins Classic', 'EB Eins Classic', '/start-poster.webp', '/start-poster-mobile.webp', '/start-video.mp4', '/start-video-mobile.mp4', 1)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  sort_order = excluded.sort_order;

-- Motor options
insert into motor_options (id, label, description, image_url, sort_order) values
  ('torqeedo-1-6', 'Torqeedo 1.6kW',          'Leise und effizient. Ideal für ruhige Seen und entspannte Ausfahrten im Nahbereich.',                                   '/options/motors/torqeedo-1-6.webp', 1),
  ('torqeedo-6',   'Torqeedo 6kW (4.3kW AT)',  'Vielseitige Leistung für längere Touren, wechselnde Bedingungen und mehr Freiheit.',                                    '/options/motors/torqeedo-6.webp',   2),
  ('torqeedo-12',  'Torqeedo 12kW',             'Maximale Kraft für anspruchsvolle Gewässer und ein intensives Fahrerlebnis.',                                           '/options/motors/torqeedo-12.webp',  3)
on conflict (id) do update set
  label = excluded.label,
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;

-- Color options
insert into color_options (id, label, hex, sort_order) values
  ('grau',   'Gelcoat Grau',         '#8A8F94', 1),
  ('carbon', 'Carbon Schwarz',       '#1C1C1C', 2),
  ('weiss',  'Gelcoat Signalweiß',   '#EBEBEB', 3),
  ('orange', 'Gelcoat Orange',       '#D4651A', 4)
on conflict (id) do update set
  label = excluded.label,
  hex = excluded.hex,
  sort_order = excluded.sort_order;

-- Extra options
insert into extra_options (id, label, description, image_url, requires_extra_id, sort_order) values
  ('hafenplane',        'Hafenplane',                  'Maßgeschneiderte Vollabdeckung für optimalen Schutz im Hafen — vor Witterung, UV und Schmutz.',                                                                                            '/options/extras/hafenplane.webp',           null,          1),
  ('fahrercockpitplane','Fahrercockpitplane',           'Gezielte Abdeckung des Cockpitbereichs. Schützt Steuerung und Sitze, lässt das Heck frei.',                                                                                                '/options/extras/fahrercockpitplane.webp',   null,          2),
  ('targabuegel',       'Targabügel',                   'Hochwertiger Edelstahl-Rahmen als Basis für das Sonnensegel und weitere Aufbauten.',                                                                                                       '/options/extras/targabuegel.webp',          null,          3),
  ('sonnensegel',       'Sonnensegel',                  'Eleganter Sonnenschutz, der auf dem Targabügel montiert wird. Setzt Targabügel voraus.',                                                                                                   '/options/extras/sonnensegel.webp',          'targabuegel', 4),
  ('bordelektrik',      'Bordelektrik mit Display',     'Integriertes 12V-Bordnetz mit Display — für Navigation, Karten und elektrisches Zubehör.',                                                                                                '/options/extras/bordelektrik.webp',         null,          5),
  ('led-navigation',   'LED Navigationsbeleuchtung',   'Zugelassene LED-Navigationslichter für sichere Fahrten bei Dunkelheit und eingeschränkter Sicht.',                                                                                        '/options/extras/led-navigation.webp',       null,          6)
on conflict (id) do update set
  label = excluded.label,
  description = excluded.description,
  image_url = excluded.image_url,
  requires_extra_id = excluded.requires_extra_id,
  sort_order = excluded.sort_order;

-- Polster options
insert into polster_options (id, label, sort_order) values
  ('cockpitpolster',     'Cockpitpolster',     1),
  ('soziuspolster',      'Soziuspolster',      2),
  ('sonnenliegepolster', 'Sonnenliegepolster', 3),
  ('bordwandpolster',    'Bordwand-Polster',   4)
on conflict (id) do update set
  label = excluded.label,
  sort_order = excluded.sort_order;

-- Polster farbe options
insert into polster_farbe_options (id, label, hex, image_url, sort_order) values
  ('diamante-mineral',  'Diamante Mineral',  '#7A8A8F', '/options/polster-farben/diamante-mineral.webp',  1),
  ('diamante-perla',    'Diamante Perla',    '#E2DDD4', '/options/polster-farben/diamante-perla.webp',    2),
  ('diamante-coral',    'Diamante Coral',    '#C96B58', '/options/polster-farben/diamante-coral.webp',    3),
  ('diamante-celeste',  'Diamante Celeste',  '#7AAEC8', '/options/polster-farben/diamante-celeste.webp',  4),
  ('diamante-grafito',  'Diamante Grafito',  '#3E3E3E', '/options/polster-farben/diamante-grafito.webp',  5),
  ('diamante-taupe',    'Diamante Taupe',    '#8E7E6E', '/options/polster-farben/diamante-taupe.webp',    6),
  ('diamante-pirita',   'Diamante Pirita',   '#B5A05E', '/options/polster-farben/diamante-pirita.webp',   7)
on conflict (id) do update set
  label = excluded.label,
  hex = excluded.hex,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;
