var engines = new Object({
  'google': {
    title: 'Google',
    placeholder: 'Search Google',
      query: 'https://www.google.com/search?hl=en&safe=off&output=search&sclient=psy-ab&q=%QUERY&btnG=&oq=&gs_l=&pbx=1',
  },
  'google-uk': {
    title: 'Google (UK)',
    placeholder: 'Search Google (UK)',
    query: 'https://www.google.co.uk/search?hl=en&safe=off&output=search&sclient=psy-ab&q=%QUERY&btnG=&oq=&gs_l=&pbx=1',
  },
  'wikipedia': {
    title: 'Wikipedia (EN)',
    placeholder: 'Search English Wikipeida Articles',
    query: 'http://en.wikipedia.org/w/index.php?search=%QUERY&button=&title=Special%3ASearch'
  },
  'imdb': {
    title: 'IMDB',
    placeholder: 'Search IMDB for movies etc.',
    query: 'http://www.imdb.com/find?q=%QUERY&s=all'
  },
  'google-images': {
    title: 'Google Images',
    placeholder: 'Search Google for Images',
    query: 'http://images.google.com/search?num=10&hl=en&safe=off&site=&tbm=isch&source=hp&biw=2048&bih=1027&q=%QUERY&btnG=Search+by+image&oq=&gs_l=',
  },
  'youtube': {
    title: 'YouTube',
    placeholder: 'Find YouTube Videos',
    query: 'http://www.youtube.com/results?search_query=%QUERY'
  },
  'bing': {
    title: 'Bing',
    placeholder: 'Search Bing',
    query: 'http://www.bing.com/search?q=%QUERY&go=&qs=bs&form=QBLH&filt=all'
  }
});
