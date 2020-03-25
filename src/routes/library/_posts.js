// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		gamertag: 'c u l8er',
		mapMaker: true,
		tester: true,
		lead: false,
		mapsMade: 5,
		kudosGiven: 15,
		id: '6DeTmldFD3Bqxy8Fi6g6wpheRlOe0mjd1CgkGlDgSSw.QA3B9Qb-JFkAfU5RyZzVjxAfGMMeCRoL-BLoFqDdd8M',
		html: ``
	},
	{
		gamertag: 'killer200O',
		mapMaker: true,
		tester: true,
		lead: false,
		mapsMade: 5,
		kudosGiven: 15,
		id: 'Hfc62zzWDK_3mrKuhY8v11rCyqM-GUBZ-vttDopb7uw.9oG4hyKC9RB4UgB1_ud1hqXE9_hVgY8KbZ6sfxG9PcY',
		html: ``
	},
	{
		gamertag: 'd minus c',
		mapMaker: false,
		tester: false,
		lead: true,
		mapsMade: 5,
		kudosGiven: 15,
		id: 'bf8iU08_3BHOO2jsoe_C4KI7J-XlZG2mdKL1WToZpaw.M6_bg5-byWC_OQQXwVWE51MY79pjVPIYGjUBnmIk314',
		html: ``
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

// the map makers list is randomized for fairness
posts.sort(() => Math.random() - 0.5)

export default posts;
