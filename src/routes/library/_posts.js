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
		id: 'bf8iU08_3BHOO2jsoe_C4KI7J-XlZG2mdKL1WToZpaw.M6_bg5-byWC_OQQXwVWE51MY79pjVPIYGjUBnmIk314',
		html: ``
	},
	{
		gamertag: 'killer200O',
		id: 'bf8iU08_3BHOO2jsoe_C4KI7J-XlZG2mdKL1WToZpaw.M6_bg5-byWC_OQQXwVWE51MY79pjVPIYGjUBnmIk314',
		html: ``
	},
	{
		gamertag: 'd minus c',
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
