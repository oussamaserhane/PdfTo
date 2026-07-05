{
  description = "PDFto - Professional PDF Tools, Free, Private & Browser-Based";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" ];

      # Overlay that provides PDFto package on any system
      overlay = final: prev: {
        PDFto = final.callPackage ./nix/package.nix { };
      };
    in
    {
      # NixOS module
      nixosModules.default = import ./nix/nixos-module.nix;
      nixosModules.PDFto = self.nixosModules.default;

      # Home-manager module
      homeManagerModules.default = import ./nix/hm-module.nix;
      homeManagerModules.PDFto = self.homeManagerModules.default;

      # Overlay
      overlays.default = overlay;
    }
    //
    flake-utils.lib.eachSystem supportedSystems (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ overlay ];
        };
      in
      {
        packages = {
          PDFto = pkgs.PDFto;
          default = pkgs.PDFto;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nginx
          ];
        };
      }
    );
}
