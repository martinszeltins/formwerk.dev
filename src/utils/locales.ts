// https://github.com/unicode-org/cldr/blob/22af90ae3bb04263f651323ce3d9a71747a75ffb/common/supplemental/supplementalData.xml#L4649-L4664
// https://github.com/adobe/react-spectrum/blob/12920fc91afa90d54ae769db45a1cff4b823e1bb/packages/dev/docs/pages/react-aria/home/I18n.tsx#L61
const preferences = [
  // Tier 1
  { value: 'fr-FR' },
  { value: 'fr-CA' },
  { value: 'de-DE' },
  { value: 'en-US' },
  { value: 'en-GB' },
  { value: 'ja-JP', ordering: 'gregory japanese' },
  // // Tier 2
  { value: 'da-DK' },
  { value: 'nl-NL' },
  { value: 'fi-FI' },
  { value: 'it-IT' },
  { value: 'nb-NO' },
  { value: 'es-ES' },
  { value: 'sv-SE' },
  { value: 'pt-BR' },
  // // Tier 3
  { value: 'zh-CN' },
  { value: 'zh-TW', ordering: 'gregory roc chinese' },
  { value: 'ko-KR' },
  // // Tier 4
  { value: 'bg-BG' },
  { value: 'hr-HR' },
  { value: 'cs-CZ' },
  { value: 'et-EE' },
  { value: 'hu-HU' },
  { value: 'lv-LV' },
  { value: 'lt-LT' },
  { value: 'pl-PL' },
  { value: 'ro-RO' },
  { value: 'ru-RU' },
  { value: 'sr-SP' },
  { value: 'sk-SK' },
  { value: 'sl-SI' },
  { value: 'tr-TR' },
  { value: 'uk-UA' },
  // // Tier 5
  {
    value: 'ar-AE',
    ordering: 'gregory islamic-umalqura islamic islamic-civil islamic-tbla',
  },
  { value: 'ar-DZ', ordering: 'gregory islamic islamic-civil islamic-tbla' },
  {
    value: 'ar-EG',
    ordering: 'gregory coptic islamic islamic-civil islamic-tbla',
  },
  { value: 'ar-SA', ordering: 'islamic-umalqura gregory islamic islamic-rgsa' },
  { value: 'el-GR' },
  {
    value: 'he-IL',
    ordering: 'gregory hebrew islamic islamic-civil islamic-tbla',
  },

  {
    value: 'fa-AF',
    ordering: 'persian gregory islamic islamic-civil islamic-tbla',
  },
  // {territories: 'CN CX HK MO SG', ordering: 'gregory chinese'},
  { value: 'am-ET', ordering: 'gregory ethiopic ethioaa' },
  { value: 'hi-IN', ordering: 'gregory indian' },
  // {territories: 'KR', ordering: 'gregory dangi'},
  { value: 'th-TH', ordering: 'buddhist gregory' },
];

export function getLocales() {
  const langDisplay = new Intl.DisplayNames('en', { type: 'language' });
  const regionDisplay = new Intl.DisplayNames('en', { type: 'region' });

  return preferences
    .map((item) => {
      const locale = new Intl.Locale(item.value);

      return {
        ...item,
        label: `${langDisplay.of(locale.language)} (${regionDisplay.of(locale.region!)})`,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

// https://github.com/adobe/react-spectrum/blob/12920fc91afa90d54ae769db45a1cff4b823e1bb/packages/dev/docs/pages/react-aria/home/I18n.tsx#L90
export function matchLocale(defaultLocale: string) {
  let parsed: Intl.Locale;
  try {
    parsed = new Intl.Locale(defaultLocale);
  } catch {
    return 'en-US';
  }

  const locales = preferences.map((p) => new Intl.Locale(p.value));

  // Try with both language and region first, and if that fails, try again with just language
  const p =
    locales.find(
      (locale) =>
        locale.language === parsed.language && locale.region === parsed.region,
    ) || locales.find((locale) => locale.language === parsed.language);

  return p?.toString() || 'en-US';
}

export function getUnits() {
  const units = [
    { label: 'Acre', value: 'acre' },
    { label: 'Bit', value: 'bit' },
    { label: 'Byte', value: 'byte' },
    { label: 'Celsius', value: 'celsius' },
    { label: 'Centimeter', value: 'centimeter' },
    { label: 'Day', value: 'day' },
    { label: 'Degree', value: 'degree' },
    { label: 'Fahrenheit', value: 'fahrenheit' },
    { label: 'Fluid Ounce', value: 'fluid-ounce' },
    { label: 'Foot', value: 'foot' },
    { label: 'Gallon', value: 'gallon' },
    { label: 'Gigabit', value: 'gigabit' },
    { label: 'Gigabyte', value: 'gigabyte' },
    { label: 'Gram', value: 'gram' },
    { label: 'Hectare', value: 'hectare' },
    { label: 'Hour', value: 'hour' },
    { label: 'Inch', value: 'inch' },
    { label: 'Kilobit', value: 'kilobit' },
    { label: 'Kilobyte', value: 'kilobyte' },
    { label: 'Kilogram', value: 'kilogram' },
    { label: 'Kilometer', value: 'kilometer' },
    { label: 'Liter', value: 'liter' },
    { label: 'Megabit', value: 'megabit' },
    { label: 'Megabyte', value: 'megabyte' },
    { label: 'Meter', value: 'meter' },
    { label: 'Microsecond', value: 'microsecond' },
    { label: 'Mile', value: 'mile' },
    { label: 'Scandinavian Mile', value: 'mile-scandinavian' },
    { label: 'Milliliter', value: 'milliliter' },
    { label: 'Millimeter', value: 'millimeter' },
    { label: 'Millisecond', value: 'millisecond' },
    { label: 'Minute', value: 'minute' },
    { label: 'Month', value: 'month' },
    { label: 'Nanosecond', value: 'nanosecond' },
    { label: 'Ounce', value: 'ounce' },
    { label: 'Percent', value: 'percent' },
    { label: 'Petabyte', value: 'petabyte' },
    { label: 'Pound', value: 'pound' },
    { label: 'Second', value: 'second' },
    { label: 'Stone', value: 'stone' },
    { label: 'Terabit', value: 'terabit' },
    { label: 'Terabyte', value: 'terabyte' },
    { label: 'Week', value: 'week' },
    { label: 'Yard', value: 'yard' },
    { label: 'Year', value: 'year' },
  ];

  return units;
}
