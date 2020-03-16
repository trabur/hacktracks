import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		gamertag: post.gamertag,
		id: post.id
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}