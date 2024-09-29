document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cellLineFilter = document.getElementById('cell-line-filter');
    const cnvFilter = document.getElementById('cnv-filter');
    const chromosomeFilter = document.getElementById('chromosome-filter');
    const resultsBody = document.getElementById('results-body');
    const featuredGenesContainer = document.querySelector('.gene-cards');

    // Mock data for demonstration
    const mockGenes = [
        { id: 'PF3D7_0603300', name: 'GCH1', chromosome: '6', cnv: 3, mutations: 'mutation A, mutation B', cellLine: 'Dd2' },
        { id: 'PF3D7_1134000', name: 'DHODH', chromosome: '12', cnv: 2, mutations: 'mutation C', cellLine: '3D7' },
        { id: 'PF3D7_1343700', name: 'PfCRT', chromosome: '7', cnv: 1, mutations: 'mutation D, mutation E', cellLine: 'C710' },
    ];

    function renderResults(genes) {
        resultsBody.innerHTML = '';
        genes.forEach(gene => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gene.id}</td>
                <td>${gene.name}</td>
                <td>${gene.chromosome}</td>
                <td>${gene.cnv}</td>
                <td>${gene.mutations}</td>
                <td>${gene.cellLine}</td>
            `;
            resultsBody.appendChild(row);
        });
    }

    function renderFeaturedGenes(genes) {
        featuredGenesContainer.innerHTML = '';
        genes.forEach(gene => {
            const card = document.createElement('div');
            card.className = 'gene-card';
            card.innerHTML = `
                <h3>${gene.id}</h3>
                <p>Name: ${gene.name}</p>
                <p>Chromosome: ${gene.chromosome}</p>
            `;
            featuredGenesContainer.appendChild(card);
        });
    }

    function searchGenes() {
        const searchTerm = searchInput.value.toLowerCase();
        const cellLine = cellLineFilter.value;
        const minCNV = parseInt(cnvFilter.value) || 0;
        const chromosome = chromosomeFilter.value;

        const filteredGenes = mockGenes.filter(gene => 
            (gene.id.toLowerCase().includes(searchTerm) || gene.name.toLowerCase().includes(searchTerm)) &&
            (cellLine === '' || gene.cellLine === cellLine) &&
            gene.cnv >= minCNV &&
            (chromosome === '' || gene.chromosome === chromosome)
        );

        renderResults(filteredGenes);
    }

    searchButton.addEventListener('click', searchGenes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGenes();
        }
    });

    // Initialize featured genes
    renderFeaturedGenes(mockGenes);
});
