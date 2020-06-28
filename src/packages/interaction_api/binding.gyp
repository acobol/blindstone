{
    "targets": [{
        "target_name": "interactionapi",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "src/interaction_api_exporter.cpp",
        ],
        "conditions": [
          ["OS=='win'", {
            "sources": ["src/interaction_api_windows.cpp"],
            "defines": ['WIN']
          }]
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'libraries': [],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}