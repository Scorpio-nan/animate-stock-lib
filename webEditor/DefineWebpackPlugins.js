class StructureDonePlugin {
    apply(complier) {
        complier.hooks.done.tap('StructureDonePlugin', () => {
            console.log('构建完成~');
        })
    }
}

class ReplacePlugin {
    apply(complier) {
        complier.hooks.compilation.tap('ReplacePlugin', (compilation) => {
            compilation.hooks.optimizeChunkAssets.tap('ReplacePlugin', (chunks) => {

            })
        })
    }
}

exports.ReplacePlugin = ReplacePlugin;
exports.StructureDonePlugin = StructureDonePlugin;
