import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		gamertag: post.gamertag,
		mapMaker: post.mapMaker,
		tester: post.tester,
		lead: post.lead,
		mapsMade: post.mapsMade,
		kudosGiven: post.kudosGiven,
		id: post.id
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}