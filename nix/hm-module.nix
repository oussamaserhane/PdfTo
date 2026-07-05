{ config, lib, pkgs, ... }:

let
  cfg = config.services.PDFto;
in
{
  options.services.PDFto = {
    enable = lib.mkEnableOption "PDFto - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.PDFto;
      defaultText = lib.literalExpression "pkgs.PDFto";
      description = "The PDFto package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        PDFto = final.callPackage ./package.nix { };
      })
    ];

    systemd.user.services.PDFto = {
      Unit = {
        Description = "PDFto PDF Tools";
        After = [ "network.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/PDFto";
        Restart = "on-failure";
        Environment = [
          "PDFto_PORT=${toString cfg.port}"
        ];
      };

      Install = {
        WantedBy = [ "default.target" ];
      };
    };
  };
}
