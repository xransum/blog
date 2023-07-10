(function() {
    var cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
            .selector('node')
            .style({
                'content': 'data(name)',
                'text-valign': 'center',
                'text-halign': 'center',
                'width': '120px',
                'height': '40px',
                'border-width': '1px',
                'border-color': '#333',
                'background-color': '#ccc',
                'font-size': '14px'
            })
            .selector('edge')
            .style({
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': '#ddd',
                'target-arrow-color': '#ddd'
            })
            .selector('.highlighted')
            .style({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }),

        elements: {
            nodes: [
                { data: { id: 'client', name: 'Client' } },
                { data: { id: 'dnsresolver', name: 'DNS Resolver' } },
                { data: { id: 'rootdnsserver', name: 'Root DNS Server' } },
                { data: { id: 'tld', name: 'Top-level Domain (TLD) DNS Server' } },
                { data: { id: 'authoritative', name: 'Authoritative DNS Server' } }
            ],

            edges: [
                { data: { source: 'client', target: 'dnsresolver' } },
                { data: { source: 'dnsresolver', target: 'rootdnsserver' } },
                { data: { source: 'rootdnsserver', target: 'dnsresolver' } },
                { data: { source: 'dnsresolver', target: 'tld' } },
                { data: { source: 'tld', target: 'dnsresolver' } },
                { data: { source: 'dnsresolver', target: 'authoritative' } },
                { data: { source: 'authoritative', target: 'dnsresolver' } },
                { data: { source: 'dnsresolver', target: 'client' } },
            ]
        },
        layout: {
            name: 'breadthfirst',
            directed: true,
            roots: '#client',
            padding: 10
        }
    });

    var bfs = cy.elements().bfs('#client', function() {}, true);
    console.log(bfs);

    var i = 0;
    var highlightNextEle = function() {
        if (i < bfs.path.length) {
            var currentEle = bfs.path[i];
            var prevEle = bfs.path[i - 1];

            currentEle.addClass('highlighted');

            if (prevEle) {
                var edge = prevEle.edgesTo(currentEle);
                edge.addClass('highlighted');
            }

            if (prevEle && i > 1) {
                var prevEdge = bfs.path[i - 2].edgesTo(prevEle);
                prevEdge.removeClass('highlighted');
            }

            i++;
            setTimeout(highlightNextEle, 1000);
        }
    };

    // kick off first highlight
    highlightNextEle();
})();
